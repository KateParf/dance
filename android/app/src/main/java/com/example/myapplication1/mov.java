package com.example.myapplication1;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.noties.markwon.Markwon;

public class mov extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_mov);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.mov), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        Intent intent = getIntent();
        if (intent.hasExtra("moveId")) {
            String index = intent.getStringExtra("moveId");
            new JsonTask(this,
                    (resStatus, resObj, resError) -> {
                        if (!resStatus) {
                            DrawError(resError);

                        } else {
                            DrawMove(resObj);
                        }
                        return null;
                    }
            ).execute("http://85.236.190.126:5001/api/move/" +index);
        }
    }
    private void DrawError(String error) {
        TextView txtRes = findViewById(R.id.txtScheme);
        txtRes.setText("!!! ERROR !!! " + error);
    }

    private void DrawMove(JSONArray moves) {
        try {
            JSONObject move = moves.getJSONObject(0);
            String name = move.getString("name");
            String schemeMarkdown = move.getString("description");


            TextView txtName = findViewById(R.id.txtName);
            TextView txtScheme = findViewById(R.id.txtScheme);


            // Создаем экземпляр Markwon и применяем Markdown к txtScheme
            Markwon markwon = Markwon.create(this);
            markwon.setMarkdown(txtScheme, "## Схема движения:\n " + schemeMarkdown);

            txtName.setText(name);



            //Видео
            JSONArray videosArray = move.getJSONArray("videos");
            if (videosArray.length() > 0) {
                JSONObject video = videosArray.getJSONObject(0); // Получаем первый объект видео
                String videoUrl = video.getString("url");
                WebView webview = findViewById(R.id.video);
                WebSettings webSettings = webview.getSettings();
                webSettings.setJavaScriptEnabled(true);
                webview.setWebViewClient(new WebViewClient());


                // Получаем URL из объекта видео
                webview.loadUrl(videoUrl);

                //Подпись под видео
                TextView txtVideo = findViewById(R.id.textVideo);
                markwon.setMarkdown(txtVideo, "## Видео\n ");


                TextView textView = findViewById(R.id.textVideoLink);

                SpannableString spannableString = new SpannableString(name);
                ClickableSpan clickableSpan = new ClickableSpan() {
                    @Override
                    public void onClick(View widget) {
                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(videoUrl));
                        startActivity(browserIntent);
                    }

                    @Override
                    public void updateDrawState(TextPaint ds) {
                        super.updateDrawState(ds);
                        ds.setColor(Color.parseColor("#5B3C2C")); // Задаем цвет текста
                        ds.setUnderlineText(false); // Убираем подчеркивание
                    }
                };

                spannableString.setSpan(clickableSpan, 0, name.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

                textView.setText(spannableString);
                textView.setMovementMethod(LinkMovementMethod.getInstance());
            }
            else{}

        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }


}