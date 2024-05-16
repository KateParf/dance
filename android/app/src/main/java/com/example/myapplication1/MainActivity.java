package com.example.myapplication1;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageButton;
import android.widget.RelativeLayout;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;




public class MainActivity extends AppCompatActivity {

    private RelativeLayout headerLayout;
    private LinearLayout sectionsLayout;
    private boolean isHeaderExpanded = false;
    private int originalHeaderHeight;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        headerLayout = findViewById(R.id.header_main);
        sectionsLayout = findViewById(R.id.sections_layout);
        originalHeaderHeight = headerLayout.getLayoutParams().height;

        ImageButton toggleButton = findViewById(R.id.toggle_button);
        toggleButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RelativeLayout.LayoutParams params = (RelativeLayout.LayoutParams) headerLayout.getLayoutParams();
                if (isHeaderExpanded) {
                    // Возвращаем шапку к исходному размеру
                    params.height = originalHeaderHeight;
                    headerLayout.setLayoutParams(params);

                    // Скрываем разделы
                    sectionsLayout.setVisibility(View.GONE);

                    isHeaderExpanded = false;
                } else {
                    // Увеличиваем размер шапки
                    params.height = 500; // Новая высота шапки в пикселях или dp
                    headerLayout.setLayoutParams(params);

                    // Показываем разделы
                    sectionsLayout.setVisibility(View.VISIBLE);

                    isHeaderExpanded = true;
                }
            }
        });


    }
    public void goOnDirection(View v){
        Intent intent = new Intent(this, types.class);
        startActivity(intent);
    }
    public void goOnPeriod(View v){
        Intent intent = new Intent(this, period.class);
        startActivity(intent);
    }
    public void goOnLevel(View v){
        Intent intent = new Intent(this, levels.class);
        startActivity(intent);
    }

    public void goOnMovement(View v){
        Intent intent = new Intent(this, movement.class);
        startActivity(intent);
    }

}