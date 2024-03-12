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

    // видео - много - массив
    // ссылка на видеофайл, русское название видео
    public IEnumerable<Media> Videos { get; set; }

    // музыка - много - массив
    // ссылка на аудиофайл, русское название музыки
    public IEnumerable<Media> Music { get; set; }

}
