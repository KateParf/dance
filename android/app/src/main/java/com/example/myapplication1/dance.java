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
import android.widget.ImageView;
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

public class dance extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_dance);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.dance), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        Intent intent = getIntent();
        if (intent.hasExtra("danceId")) {
            int index = intent.getIntExtra("danceId", 0);
            new JsonTask(this,
                    (resStatus, resObj, resError) -> {
                        if (!resStatus) {
                            DrawError(resError);

                        } else {
                            DrawDanceActivity(resObj);
                        }
                        return null;
                    }
            ).execute("hhttps://dancebook.runasp.net/api/dance/" + String.valueOf(index));
        }



    }

    private void DrawError(String error) {
        TextView txtRes = findViewById(R.id.txtScheme);
        txtRes.setText("!!! ERROR !!! " + error);
    }



    private void DrawDanceActivity(JSONArray dances) {
        try {
            JSONObject dance = dances.getJSONObject(0);
            String name = dance.getString("name");
            String epoch = dance.getJSONObject("epoch").getString("name");
            String level = "Сложность: " + dance.getJSONObject("level").getString("name");
            String schemeMarkdown = dance.getString("scheme");
            String history = "История и факты: " + dance.getString("history");

            TextView txtName = findViewById(R.id.txtName);
            TextView txtEpoch = findViewById(R.id.txtEpoch);
            TextView txtLevel = findViewById(R.id.txtLevel);
            TextView txtScheme = findViewById(R.id.txtScheme);
            TextView txtHistory = findViewById(R.id.txtHistory);

            // Создаем экземпляр Markwon и применяем Markdown к txtScheme
            Markwon markwon = Markwon.create(this);
            markwon.setMarkdown(txtScheme, "## Схема танца:\n " + schemeMarkdown);

            txtName.setText(name);
            txtEpoch.setText(epoch);
            txtLevel.setText(level);
            txtHistory.setText(history);

            //Видео
            JSONArray videosArray = dance.getJSONArray("videos");
            if (videosArray.length() > 0) {
                ImageView imageView = findViewById(R.id.playV);
                imageView.setImageResource(R.drawable.play);

                JSONObject video = videosArray.getJSONObject(0); // Получаем первый объект видео
                String videoUrl = video.getString("url");

                WebView webview = findViewById(R.id.video);
                WebSettings webSettings = webview.getSettings();
                webSettings.setJavaScriptEnabled(true);
                webview.setWebViewClient(new WebViewClient());

                // Определение, YouTube или VK
                String directVideoUrl;
                if (videoUrl.contains("youtube.com") || videoUrl.contains("youtu.be")) {
                    // YouTube
                    String videoId;
                    if (videoUrl.contains("youtu.be")) {
                        videoId = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
                    } else {
                        videoId = videoUrl.substring(videoUrl.indexOf("v=") + 2);
                        int ampersandPosition = videoId.indexOf("&");
                        if (ampersandPosition != -1) {
                            videoId = videoId.substring(0, ampersandPosition);
                        }
                    }
                    directVideoUrl = "https://www.youtube.com/embed/" + videoId;
                } else if (videoUrl.contains("vk.com")) {
                    // VK
                    String videoId = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
                    directVideoUrl = "https://vk.com/video_ext.php?oid=-1&id=" + videoId;
                } else {
                    // Другие платформы - можно добавить обработку для других платформ, если нужно
                    directVideoUrl = videoUrl;
                }

                webview.loadUrl(directVideoUrl);
                // Подпись под видео
                TextView txtVideo = findViewById(R.id.textVideo);
                txtVideo.setVisibility(View.VISIBLE); // Отображаем подпись
                markwon.setMarkdown(txtVideo, "## Видео\n ");

                // Ссылка под видео
                TextView textView = findViewById(R.id.textVideoLink);
                textView.setVisibility(View.VISIBLE); // Отображаем ссылку

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
            } else {
                // Скрываем элементы, если видео нет
                findViewById(R.id.video).setVisibility(View.GONE);
                findViewById(R.id.textVideo).setVisibility(View.GONE);
                findViewById(R.id.textVideoLink).setVisibility(View.GONE);
            }


            if (videosArray.length() == 0) {
                txtScheme.setPadding(0, 0, 0, 0); // Убираем отступы сверху
                txtHistory.setPadding(0, 0, 0, 0); // Убираем отступы сверху
            }

        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }



}