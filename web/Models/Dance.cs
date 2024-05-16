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
    public DanceType Type { get; set; }

    // эпоха
    public DanceEpoch Epoch { get; set; }

    // уровень сложности
    public DanceLevel Level { get; set; }

    // с переходом
    // тру фолз
    public bool ChangePartner { get; set; }

    // количество пар в сете
    // форматированный текст
    public int CountOfPairs { get; set; }

    // видео - много - массив
    // ссылка на видеофайл, русское название видео
    public IEnumerable<Video> Videos { get; set; }

    // музыка - много - массив
    // ссылка на аудиофайл, русское название музыки
    public IEnumerable<Music> Music { get; set; }

}
