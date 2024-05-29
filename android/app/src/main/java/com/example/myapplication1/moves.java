package com.example.myapplication1;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class moves extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_moves);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.moves), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        new JsonTask(this,
                (resStatus, resObj, resError) -> {
                    if (!resStatus) {
                        Log.e("JSON parse error", resError);
                    } else {
                        try {
                            DrawMoves(resObj
                            );
                        } catch (JSONException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    return null;
                }
        ).execute("https://dancebook.runasp.net/api/movescatalog");
    }
    public void DrawMoves(JSONArray moves) throws JSONException {
        LinearLayout linearLayout = findViewById(R.id.pnlMoves);
        for(int i=0;i< moves.length();i++){
            JSONObject move = moves.getJSONObject(i);
            String name = move.getString("name");
            LinearLayout cardLayout = new LinearLayout(this);
            cardLayout.setOnClickListener(v -> onClickMove(name));

            cardLayout.setBackgroundColor(Color.parseColor((i % 2 == 0) ? "#D0C8C3" : "#EFE4DD"));
            cardLayout.setOrientation(LinearLayout.VERTICAL);

            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            layoutParams.setMargins(10, 10, 10, 10); // Отступы слева, сверху, справа, снизу
            cardLayout.setLayoutParams(layoutParams);
            cardLayout.setPadding(10, 10, 10, 10);

            TextView txtName = new TextView(this);
            txtName.setText(name);
            cardLayout.addView(txtName);
            linearLayout.addView(cardLayout); // Добавляем карточку в корневой Layout

        }

    }
    public void onClickMove(String id) {
        // Обработка нажатия здесь
        Intent intent = new Intent(com.example.myapplication1.moves.this, mov.class);
        intent.putExtra("moveId", id);
        Log.e("MOVE CLICK", String.valueOf(id));
        startActivity(intent);
    }
}