package com.example.myapplication1;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class period extends AppCompatActivity {



    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //  Получите ссылку на фрагмент шапки
        HatFragment hatFragment = (HatFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_hat);
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

        Intent intent=new Intent(this, dances.class);
        // Получаем уникальный идентификатор карточки по её ID из XML разметки
        int cardId = v.getId();

        // Передаем данные на новую страницу
        intent.putExtra("cardId", cardId);
        intent.putExtra("pageId","periodId");
        startActivity(intent);
    }
}