namespace tanez.Models;

// описание медиа

public class Video {
    public int Id { get; set; }
    
    public string Url { get; set; }

    // название медиафайла
    public string Name { get; set; }
}


public class Music {
    public int Id { get; set; }
    
    public string Url { get; set; }

    // название медиафайла
    public string Name { get; set; }    
}
