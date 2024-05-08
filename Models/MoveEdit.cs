namespace tanez.Models;

// описание движения
public class MoveEdit
{
    public int id { get; set; }

    // название движения
    public string name { get; set; }
    
    // описание движения
    // форматированный текст
     public string description { get; set; }

    // видео - много - массив
    // ссылка на видеофайл, русское название видео
    public string videos { get; set; }

}
