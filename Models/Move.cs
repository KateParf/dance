namespace tanez.Models;

// описание движения
public class Move
{
    public int Id { get; set; }

    // название движения
    public string Name { get; set; }

    // описание движения
    // форматированный текст
    public string Description { get; set; }


    // видео - много - массив
    // ссылка на видеофайл, русское название видео
    public IEnumerable<Video> Videos { get; set; }
    
}
