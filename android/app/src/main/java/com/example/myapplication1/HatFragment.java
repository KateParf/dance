package com.example.myapplication1;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class HatFragment extends Fragment {

    private RelativeLayout headerLayout;
    private LinearLayout sectionsLayout;
    private boolean isHeaderExpanded = false;
    private int originalHeaderHeight;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_hat, container, false);

        // Найдите TextView по ID
        TextView myTextView = view.findViewById(R.id.goOnDirection);

        // Зарегистрируйте обработчик onClick
        myTextView.setOnClickListener(this::goOnDirection);
        // Найдите TextView по ID
        TextView myTextView1 = view.findViewById(R.id.goOnPeriod);

        // Зарегистрируйте обработчик onClick
        myTextView1.setOnClickListener(this::goOnPeriod);
        // Найдите TextView по ID
        TextView myTextView2 = view.findViewById(R.id.goOnLevel);

        // Зарегистрируйте обработчик onClick
        myTextView2.setOnClickListener(this::goOnLevel);

        // Найдите TextView по ID
        TextView myTextView3 = view.findViewById(R.id.goOnMovement);

        // Зарегистрируйте обработчик onClick
        myTextView3.setOnClickListener(this::goOnMovement);




//        // Найдите TextView по ID
//
//        ToggleButton myButton = view.findViewById(R.id.toggle_button);
//        // Зарегистрируйте обработчик onClick
//        myButton.setOnClickListener(this::onClick);



        headerLayout = view.findViewById(R.id.header_main);
        sectionsLayout = view.findViewById(R.id.sections_layout);
        originalHeaderHeight = headerLayout.getLayoutParams().height;

        ImageButton toggleButton = view.findViewById(R.id.toggle_button);

        toggleButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) headerLayout.getLayoutParams();
                if (isHeaderExpanded) {
                    params.height = originalHeaderHeight;
                    headerLayout.setLayoutParams(params);
                    sectionsLayout.setVisibility(View.GONE);
                    isHeaderExpanded = false;
                } else {
                    params.height = 500; // Новая высота шапки
                    headerLayout.setLayoutParams(params);
                    sectionsLayout.setVisibility(View.VISIBLE);
                    isHeaderExpanded = true;
                }
            }
        });

        return view;
    }

    private void goOnLevel(View view) {
        Intent intent = new Intent(getActivity(), levels.class);
        startActivity(intent);
    }

    private void goOnPeriod(View view) {
        Intent intent = new Intent(getActivity(), period.class);
        startActivity(intent);
    }

    private void goOnDirection(View view) {
        Intent intent = new Intent(getActivity(), types.class);
        startActivity(intent);
    }

    public void goOnMovement(View view) {
        Intent intent = new Intent(getActivity(), dances.class);
        startActivity(intent);
    }

    public void onClick(View view) {
        FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) headerLayout.getLayoutParams();
        if (isHeaderExpanded) {
            params.height = originalHeaderHeight;
            headerLayout.setLayoutParams(params);
            sectionsLayout.setVisibility(View.GONE);
            isHeaderExpanded = false;
        } else {
            params.height = 500; // Новая высота шапки
            headerLayout.setLayoutParams(params);
            sectionsLayout.setVisibility(View.VISIBLE);
            isHeaderExpanded = true;
        }
    }
}