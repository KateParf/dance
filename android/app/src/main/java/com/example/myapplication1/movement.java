package com.example.myapplication1;



import android.annotation.SuppressLint;
import android.os.Bundle;

import android.content.Intent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.Objects;
import org.json.JSONArray;
import org.json.JSONException;


public class movement extends AppCompatActivity {
    SeekBar seekBar;
    TextView textSeek;

    String[] types = { "Аллеманды", "Бранли", "Котильоны",
            "Контрдансы", "Народные", "Галопы", "Лендеры", "Марши",
            "Вальсы", "Кадрили", "Мазурки", "Минуэты", "Паваны",
            "Полонезы", "Польки", "Современные", "Танго", "Тустепы"
    };

    String[] period = { "Средний век", "18 век", "19 век",
            "20 век", "21 век"
    };
    String[] levels = { "Легкий", "Средний", "Сложный"
    };


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movement);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.movement), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        seekBar=findViewById(R.id.volumeSeekBar);
        textSeek=findViewById(R.id.outputSeekbar);

        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                textSeek.setText(String.valueOf(progress));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        Intent intent = getIntent();

        if(intent.hasExtra("pageId")){
            String pageId = intent.getStringExtra("pageId");
            if(Objects.equals(pageId, "levelsId")){

                if(intent.hasExtra("cardId")) {
                    Spinner spinner_levels = findViewById(R.id.spinner_levels);
                    int cardId = intent.getIntExtra("cardId", 0);

// Определяем, какое значение установить в Spinner на основе ID карточки
                    String spinnerValue = null;
                    if(cardId == R.id.card_light) {
                        spinnerValue = "Легкий";
                    } else if (cardId == R.id.card_mid) {
                        spinnerValue = "Средний";
                    } else if (cardId== R.id.card_hard){
                        spinnerValue = "Сложный";
                    }

                    // Устанавливаем значение в Spinner
                    // Далее ваш код для установки значения в Spinner
                    ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.levels_array, android.R.layout.simple_spinner_item);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinner_levels.setAdapter(adapter);

                    int position = adapter.getPosition(spinnerValue);
                    spinner_levels.setSelection(position);
                }
                Spinner spinner_types = findViewById(R.id.spinner_types);
                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
                ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, types);
                // Определяем разметку для использования при выборе элемента
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                // Применяем адаптер к элементу spinner
                spinner_types.setAdapter(adapter);
                //Intent intent = getIntent();
                // int id = intent.getIntExtra("id", 0); // 0 - значение по умолчанию, если айдишник не будет найден
                //spinner.setSelection(id);

                Spinner spinner_period = findViewById(R.id.spinner_period);
                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
                ArrayAdapter<String> adapter1 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, period);
                // Определяем разметку для использования при выборе элемента
                adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                // Применяем адаптер к элементу spinner
                spinner_period.setAdapter(adapter1);

            }

           else if(Objects.equals(pageId, "typesId")){
                if(intent.hasExtra("cardId")) {
                    Spinner spinner_types = findViewById(R.id.spinner_types);
                    int cardId = intent.getIntExtra("cardId", 0);

                   // Определяем, какое значение установить в Spinner на основе ID карточки
                    String spinnerTypesValue = null;
                    if (cardId == R.id.card_allemandes) {
                        spinnerTypesValue = "Аллеманды";
                    } else if (cardId == R.id.card_branly) {
                        spinnerTypesValue = "Бранли";
                    } else if (cardId == R.id.card_waltzes) {
                        spinnerTypesValue = "Вальсы";
                    } else if (cardId == R.id.card_gallops) {
                        spinnerTypesValue = "Галопы";
                    } else if (cardId == R.id.card_quadrille) {
                        spinnerTypesValue = "Кадрили";
                    } else if (cardId == R.id.card_countrydance) {
                        spinnerTypesValue = "Контрдансы";
                    } else if (cardId == R.id.card_cotillions) {
                        spinnerTypesValue = "Котильоны";
                    } else if (cardId == R.id.card_landlers) {
                        spinnerTypesValue = "Лэндлеры";
                    } else if (cardId == R.id.card_mazurkas) {
                        spinnerTypesValue = "Мазурки";
                    } else if (cardId == R.id.card_marches) {
                        spinnerTypesValue = "Марши";
                    } else if (cardId == R.id.card_minuets) {
                        spinnerTypesValue = "Менуэты";
                    } else if (cardId == R.id.card_folkdances) {
                        spinnerTypesValue = "Народные";
                    } else if (cardId == R.id.card_pawans) {
                        spinnerTypesValue = "Паваны";
                    } else if (cardId == R.id.card_polonaises) {
                        spinnerTypesValue = "Полонезы";
                    } else if (cardId == R.id.card_polkas) {
                        spinnerTypesValue = "Польки";
                    } else if (cardId == R.id.card_moderndance) {
                        spinnerTypesValue = "Современные";
                    } else if (cardId == R.id.card_tango) {
                        spinnerTypesValue = "Танго";
                    } else if (cardId == R.id.card_twosteps) {
                        spinnerTypesValue = "Тустепы";
                    }

                    // Устанавливаем значение в Spinner
                    // Далее ваш код для установки значения в Spinner
                    ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.types_array, android.R.layout.simple_spinner_item);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinner_types.setAdapter(adapter);

                    int position = adapter.getPosition(spinnerTypesValue);
                    spinner_types.setSelection(position);
                }

                Spinner spinner_levels = findViewById(R.id.spinner_levels);
                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
                ArrayAdapter<String> adapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, levels);
                // Определяем разметку для использования при выборе элемента
                adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                // Применяем адаптер к элементу spinner
                spinner_levels.setAdapter(adapter2);


                Spinner spinner_period = findViewById(R.id.spinner_period);
                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
                ArrayAdapter<String> adapter1 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, period);
                // Определяем разметку для использования при выборе элемента
                adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                // Применяем адаптер к элементу spinner
                spinner_period.setAdapter(adapter1);

            }
           else if(Objects.equals(pageId, "periodId")){
                if(intent.hasExtra("cardId")) {
                    Spinner spinner_period = findViewById(R.id.spinner_period);
                    int cardId = intent.getIntExtra("cardId", 0);

        // Определяем, какое значение установить в Spinner на основе ID карточки
                    String spinnerPeriodsValue = null;
                    if (cardId == R.id.card_middleAges) {
                        spinnerPeriodsValue = "Средние века";
                    } else if (cardId == R.id.card_eightAges) {
                        spinnerPeriodsValue = "18 век";
                    } else if (cardId == R.id.card_nineAges) {
                        spinnerPeriodsValue = "19 век";
                    } else if (cardId == R.id.card_twentyAges) {
                        spinnerPeriodsValue = "20 век";
                    } else if (cardId == R.id.card_twentyOneAges) {
                        spinnerPeriodsValue = "21 век";
                    }

                    // Устанавливаем значение в Spinner
                    // Далее ваш код для установки значения в Spinner
                    ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.periods_array, android.R.layout.simple_spinner_item);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinner_period.setAdapter(adapter);

                    int position = adapter.getPosition(spinnerPeriodsValue);
                    spinner_period.setSelection(position);
                }
                Spinner spinner_types = findViewById(R.id.spinner_types);
                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
                ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, types);
                // Определяем разметку для использования при выборе элемента
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                // Применяем адаптер к элементу spinner
                spinner_types.setAdapter(adapter);
                //Intent intent = getIntent();
                // int id = intent.getIntExtra("id", 0); // 0 - значение по умолчанию, если айдишник не будет найден
                //spinner.setSelection(id);

                Spinner spinner_levels = findViewById(R.id.spinner_levels);
                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
                ArrayAdapter<String> adapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, levels);
                // Определяем разметку для использования при выборе элемента
                adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                // Применяем адаптер к элементу spinner
                spinner_levels.setAdapter(adapter2);
            }

        }


    }

    // обработчик кнопки Найти
    public void onFilterSubmit(View v) {
        // запуск задачи получения данных с сервера
        new JsonTask(this,
                (resStatus, resObj, resError) -> {
                    if (!resStatus) {
                        TextView txtRes = findViewById(R.id.txtRes);
                        txtRes.setText("!!! ERROR !!! " + resError);
                    } else
                        DrawDances(resObj);
                    return null;
                }
        ).execute("http://85.236.190.126:5001/api/dances");
    }

    // рисуем список танцев на странице, которые получили с сервера
    public void DrawDances(JSONArray dances) {
        TextView txtRes = findViewById(R.id.txtRes);
        String r = "";

        for (int i = 0; i < dances.length(); i++) {
            try {
                r += dances.getJSONObject(i).getString("name") + "\n\n";
            } catch (JSONException e) {
                r += "!!! ERROR !!!" + "\n\n";
            }
        }
        txtRes.setText(r);
    }

}


//public class movement extends AppCompatActivity {
//SeekBar seekBar;
//TextView textSeek;
//Spinner spinner_levels=findViewById(R.id.spinner_levels);
//Spinner spinner_types=findViewById(R.id.spinner_types);
//Spinner spinner_period=findViewById(R.id.spinner_period);
//
//    String[] types = { "Аллеманды", "Бранли", "Котильоны",
//            "Контрдансы", "Народные", "Галопы", "Лендеры", "Марши",
//            "Вальсы", "Кадрили", "Мазурки", "Минуэты", "Паваны",
//            "Полонезы", "Польки", "Современные", "Танго", "Тустепы"
//    };
//
//    String[] period = { "Средний век", "18 век", "19 век",
//            "20 век", "21 век"
//    };
//    String[] levels = { "Легкий", "Средний", "Сложный"
//    };
//
//    @SuppressLint({"MissingInflatedId", "CutPasteId"})
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_movement);
//        Intent intent = getIntent();
//
//        if (intent.hasExtra("PageId")) {
//            String PageId = intent.getStringExtra("pageId");
//            if (Objects.equals(PageId, "levelsId")) {
//
//                if(intent.hasExtra("cardId")) {
//                    int cardId = intent.getIntExtra("cardId", 0);
//
//// Определяем, какое значение установить в Spinner на основе ID карточки
//                    String spinnerValue = null;
//                    if(cardId == R.id.card_light) {
//                        spinnerValue = "Легкий";
//                    } else if (cardId == R.id.card_mid) {
//                        spinnerValue = "Средний";
//                    } else if (cardId== R.id.card_hard){
//                        spinnerValue = "Сложный";
//                    }
//
//// Устанавливаем значение в Spinner
//// Далее ваш код для установки значения в Spinner
//                    ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.levels_array, android.R.layout.simple_spinner_item);
//                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//                    spinner_levels.setAdapter(adapter);
//
//                    int position = adapter.getPosition(spinnerValue);
//                    spinner_levels.setSelection(position);
//                }
//                ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.movement), (v, insets) -> {
//                    Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
//                    v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
//                    return insets;
//                });
//
//                Spinner spinner_types = findViewById(R.id.spinner_types);
//// Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
//                ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, types);
//// Определяем разметку для использования при выборе элемента
//                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//// Применяем адаптер к элементу spinner
//                spinner_types.setAdapter(adapter);
//             //Intent intent = getIntent();
////int id = intent.getIntExtra("id", 0); // 0 - значение по умолчанию, если айдишник не будет найден
////spinner.setSelection(id);
//
//
//
//                Spinner spinner_period = findViewById(R.id.spinner_period);
//// Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
//                ArrayAdapter<String> adapter1 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, period);
//// Определяем разметку для использования при выборе элемента
//                adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//// Применяем адаптер к элементу spinner
//                spinner_period.setAdapter(adapter1);
//
//            } else if (Objects.equals(PageId, "typesId")) {
//                if (intent.hasExtra("cardId")) {
//                    int cardId = intent.getIntExtra("cardId", 0);
//                    String spinnerTypesValue = null;
//                    if (cardId == R.id.card_allemandes) {
//                        spinnerTypesValue = "Аллеманды";
//                    } else if (cardId == R.id.card_branly) {
//                        spinnerTypesValue = "Бранли";
//                    } else if (cardId == R.id.card_waltzes) {
//                        spinnerTypesValue = "Вальсы";
//                    } else if (cardId == R.id.card_gallops) {
//                        spinnerTypesValue = "Галопы";
//                    } else if (cardId == R.id.card_quadrille) {
//                        spinnerTypesValue = "Кадрили";
//                    } else if (cardId == R.id.card_countrydance) {
//                        spinnerTypesValue = "Контрдансы";
//                    } else if (cardId == R.id.card_cotillions) {
//                        spinnerTypesValue = "Котильоны";
//                    } else if (cardId == R.id.card_landlers) {
//                        spinnerTypesValue = "Лэндлеры";
//                    } else if (cardId == R.id.card_mazurkas) {
//                        spinnerTypesValue = "Мазурки";
//                    } else if (cardId == R.id.card_marches) {
//                        spinnerTypesValue = "Марши";
//                    } else if (cardId == R.id.card_minuets) {
//                        spinnerTypesValue = "Менуэты";
//                    } else if (cardId == R.id.card_folkdances) {
//                        spinnerTypesValue = "Народные";
//                    } else if (cardId == R.id.card_pawans) {
//                        spinnerTypesValue = "Паваны";
//                    } else if (cardId == R.id.card_polonaises) {
//                        spinnerTypesValue = "Полонезы";
//                    } else if (cardId == R.id.card_polkas) {
//                        spinnerTypesValue = "Польки";
//                    } else if (cardId == R.id.card_moderndance) {
//                        spinnerTypesValue = "Современные";
//                    } else if (cardId == R.id.card_tango) {
//                        spinnerTypesValue = "Танго";
//                    } else if (cardId == R.id.card_twosteps) {
//                        spinnerTypesValue = "Тустепы";
//                    }
//                    ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.types_array, android.R.layout.simple_spinner_item);
//                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//                    spinner_types.setAdapter(adapter);
//
//                    int position = adapter.getPosition(spinnerTypesValue);
//                    spinner_types.setSelection(position);
//                }
//                ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.movement), (v, insets) -> {
//                    Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
//                    v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
//                    return insets;
//                });
//                Spinner spinner_levels = findViewById(R.id.spinner_levels);
//// Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
//                ArrayAdapter<String> adapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, levels);
//// Определяем разметку для использования при выборе элемента
//                adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//// Применяем адаптер к элементу spinner
//                spinner_levels.setAdapter(adapter2);
//
//                Spinner spinner_period = findViewById(R.id.spinner_period);
//                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
//                ArrayAdapter<String> adapter1 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, period);
//                // Определяем разметку для использования при выборе элемента
//                adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//                // Применяем адаптер к элементу spinner
//                spinner_period.setAdapter(adapter1);
//
//
//            } else if (Objects.equals(PageId, "periodId")) {
//                if (intent.hasExtra("cardId")) {
//                    int cardId = intent.getIntExtra("cardId", 0);
//                    String spinnerPeriodsValue = null;
//                    if (cardId == R.id.card_middleAges) {
//                        spinnerPeriodsValue = "Средние века";
//                    } else if (cardId == R.id.card_eightAges) {
//                        spinnerPeriodsValue = "18 век";
//                    } else if (cardId == R.id.card_nineAges) {
//                        spinnerPeriodsValue = "19 век";
//                    } else if (cardId == R.id.card_twentyAges) {
//                        spinnerPeriodsValue = "20 век";
//                    } else if (cardId == R.id.card_twentyOneAges) {
//                        spinnerPeriodsValue = "21 век";
//                    }
//                    ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.periods_array, android.R.layout.simple_spinner_item);
//                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//                    spinner_period.setAdapter(adapter);
//
//                    int position = adapter.getPosition(spinnerPeriodsValue);
//                    spinner_period.setSelection(position);
//
//                }
//                ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.movement), (v, insets) -> {
//                    Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
//                    v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
//                    return insets;
//                });
//                Spinner spinner_types = findViewById(R.id.spinner_types);
//                // Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
//                ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, types);
//                // Определяем разметку для использования при выборе элемента
//                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//                // Применяем адаптер к элементу spinner
//                spinner_types.setAdapter(adapter);
//                //Intent intent = getIntent();
//                //int id = intent.getIntExtra("id", 0); // 0 - значение по умолчанию, если айдишник не будет найден
//                //spinner.setSelection(id);
//
//
//                Spinner spinner_levels = findViewById(R.id.spinner_levels);
//// Создаем адаптер ArrayAdapter с помощью массива строк и стандартной разметки элемета spinner
//                ArrayAdapter<String> adapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, levels);
//// Определяем разметку для использования при выборе элемента
//                adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//// Применяем адаптер к элементу spinner
//                spinner_levels.setAdapter(adapter2);
//            }
//        }
//
//     seekBar=findViewById(R.id.volumeSeekBar);
//     textSeek=findViewById(R.id.outputSeekbar);
//     seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
//         @Override
//         public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
//             textSeek.setText(String.valueOf(progress));
//         }
//
//         @Override
//         public void onStartTrackingTouch(SeekBar seekBar) {
//
//         }
//
//         @Override
//         public void onStopTrackingTouch(SeekBar seekBar) {
//
//         }
//     });
//
//    }
//
//}