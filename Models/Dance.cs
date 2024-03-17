namespace tanez.Models;

// описание танца
public class Dance
{
    public int Id { get; set; }

    // название танца
    public string Name { get; set; }
    
    // история танца
    // форматированный текст
     public string History { get; set; }

    // движения
    // форматированный текст
    public string Scheme { get; set; }

    // тип
    // форматированный текст
    public string Type { get; set; }

    // эпоха
    // форматированный текст
    public string Epoch { get; set; }

    // уровень сложности
    // форматированный текст
    public string Level { get; set; }

    // с переходом
    // тру фолз
    public bool ChangePartner { get; set; }

    // количество пар в сете
    // форматированный текст
    public int CountOfPairs { get; set; }

    // видео - много - массив
    // ссылка на видеофайл, русское название видео
    public IEnumerable<Media> Videos { get; set; }

    // музыка - много - массив
    // ссылка на аудиофайл, русское название музыки
    public IEnumerable<Media> Music { get; set; }

}
