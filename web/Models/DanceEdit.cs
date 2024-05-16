namespace tanez.Models;

// описание танца
public class DanceEdit
{
    public int id { get; set; }

    // название танца
    public string name { get; set; }
    
    // история танца
    // форматированный текст
     public string history { get; set; }

    // движения
    // форматированный текст
    public string scheme { get; set; }

    // тип
    public int type { get; set; }

    // эпоха
    public int epoch { get; set; }

    // уровень сложности
    public int level { get; set; }

    // с переходом
    // тру фолз
    public bool changePartner { get; set; }

    // количество пар в сете
    // форматированный текст
    public int countOfPairs { get; set; }

    // видео - много - массив
    // ссылка на видеофайл, русское название видео
    public string videos { get; set; }

    // музыка - много - массив
    // ссылка на аудиофайл, русское название музыки
    public string audios { get; set; }

}
