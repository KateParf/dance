package com.example.myapplication1;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class period extends AppCompatActivity {



    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_period);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.period), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });


    }

    public void goOnMovement(View v){

        Intent intent=new Intent(this,movement.class);
        // Получаем уникальный идентификатор карточки по её ID из XML разметки
        int cardId = v.getId();

        // Передаем данные на новую страницу
        intent.putExtra("cardId", cardId);
        intent.putExtra("pageId","periodId");
        startActivity(intent);
    }
}