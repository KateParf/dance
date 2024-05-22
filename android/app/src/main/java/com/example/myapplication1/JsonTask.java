package com.example.myapplication1;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.JSONArray;
import kotlin.jvm.functions.Function3;

// задача длЯ получения джейсона с сервера
// см. https://stackoverflow.com/questions/33229869/get-json-data-from-url-using-android
class JsonTask extends AsyncTask<String, String, String> {

    ProgressDialog pd;

    // статус задачи
    boolean resStatus = false;

    // стока с ошибкой
    String resError = "";

    // результат запроса
    JSONArray resObj;

    // функция для вызова по окончании получения данных
    // 1 - статус получения
    // 2 - json массив результатов (если все хорошо)
    // 3 - текст ошибки если неудача
    Function3<Boolean, JSONArray, String, Void> func;

    // текущая форма откуда вызвали задачу
    // чтоб на ней рисовать прогресс диалог
    Activity act;

    public JsonTask(Activity act, Function3<Boolean, JSONArray, String, Void> function) {
        super();
        func = function;
        this.act = act;
    }

    protected void onPreExecute() {
        super.onPreExecute();

        pd = new ProgressDialog(act);
        pd.setMessage("Please wait");
        pd.setCancelable(false);
        pd.show();
    }

    protected String doInBackground(String... params) {
        HttpURLConnection connection = null;
        BufferedReader reader = null;

        try {
            URL url = new URL(params[0]);
            Log.e("DANCE GET URL", params[0]);
            connection = (HttpURLConnection) url.openConnection();
            connection.connect();

            InputStream stream = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(stream));
            StringBuffer buffer = new StringBuffer();

            String line = "";
            while ((line = reader.readLine()) != null) {
                buffer.append(line + "\n");
            }

            // получили строку - парсим ее в джейсон
            // https://docs.oracle.com/javaee/7/api/javax/json/JsonArray.html
            try {
                String resTxt = buffer.toString();
                if (resTxt.substring(0,1).compareTo("[") != 0)
                    resTxt = "[" + resTxt + "]";
                //Log.e("DANCE GET RESPONSE", resTxt);
                resObj = new JSONArray(resTxt);
                resStatus = true;
            } catch (Throwable e) {
                // если ошибка парса джейсона то запоминаем в строку ошибки
                resError = e.toString();
                e.printStackTrace();
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
            resError = e.toString();
        } catch (IOException e) {
            e.printStackTrace();
            resError = e.toString();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
                resError = e.toString();
            }
        }
        return null;
    }

    @Override
    protected void onPostExecute(String result) {
        super.onPostExecute(result);
        if (pd.isShowing()) {
            pd.dismiss();
        }

        // вызываем колбек функцию
        func.invoke(resStatus, resObj, resError);
    }
    
} // JsonTask
