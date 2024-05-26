package com.example.myapplication1;

import android.content.Intent;
import android.os.Bundle;
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
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
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
                        } else
                            DrawDanceActivity(resObj);
                        return null;
                    }
            ).execute("http://85.236.190.126:5001/api/dance/" + String.valueOf(index));
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

        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }


}