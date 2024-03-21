using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class DanceController : ControllerBase {
    private readonly DanceContext _context;

    private readonly ILogger<DanceController> _logger;

    public DanceController(DanceContext context, ILogger<DanceController> logger) {
        _context = context;
        _logger = logger;
    }

    [HttpGet("{id?}")]
    public Dance Get(string id) {
        int intId = Int32.Parse(id);

        var dance = _context.Dances.Where(d => d.Id == intId)
        .Include(d => d.Epoch)
        .Include(d => d.Level)
        .Include(d => d.Type)
        .Include(d => d.Videos)
        .Include(d => d.Music)
        .FirstOrDefault<Dance>();
        return dance;

        //---
        /*        
        videos.Add( new Media { 
            Url = "https://vk.com/page-3511581_49053163?z=video-3511581_456239855%2F54a7fc7f62066d59f2" , 
            Name = "Australian Swing Waltz"
        });

        var music = new Collection<Media>();
        music.Add( new Media { 
            Url = "https://vk.com/audio-3511581_377192914_355c4342e615aa4e01" , 
            Name = "Вальсы - Australian Swing Waltz"
        });
        
        return new Dance
        {           
            Id = intId,
            Name = "Австралийский вальс",

            History = @"Танец относится к 1939 г.
Хореограф: Джек Кеннеди (г. Сидней, Австралия).
Версия Ричарда Пауэрса.
",

            Scheme = @"Схема танца 

Исходное положение: открытая пара лицом по линии танца, дама справа от кавалера.

1 часть (16 тактов)
* 1-2. С внешних ног променад по линии танца, на 4-й счёт внутренняя нога выносится во вторую воздушную позицию (приподняться на опорной ноге), пауза.
* 3-4. Променад против линии танца, повернуться лицом друг к другу (кавалер спиной в центр).
* 5-6. Соло-поворот по линии танца, закрыться в позицию «лодочка».
* 7-8. Два приставных шага по линии танца.
* 9-10. Два приставных шага против линии танца.
* 11. Раскрыться лицом по линии танца.
* 12-13. Смена мест, дама проходит под рукой кавалера, раскрыться спиной по линии танца.
* 14-15. Смена мест, дама проходит под рукой кавалера, раскрыться лицом по линии танца.
* 16. Закрыться в позицию «лодочка».

2 часть (16 тактов)
* 1-2. Шаг по линии танца и мах свободной ногой (приподняться на опорной ноге), то же самое против линии танца.
* 3. Раскрыться лицом по линии танца (кавалер и дама образуют угол примерно в 45° к линии танца).
* 4. Шаг вперёд с внутренних ног с переносом на них веса (кавалер – с правой ноги, дама – с левой).
* 5. Качнуться назад (кавалер переносит вес на левую ногу, дама – на правую).
* 6. Променад по линии танца, закрыться в позицию «лодочка».
* 7-8. Шаг по линии танца и мах свободной ногой (приподняться на опорной ноге), то же самое против линии танца.
* 9-10. Поворот дамы под левой рукой кавалера по линии танца, у кавалера один приставной шаг и шаг по линии танца с махом ноги.
* 11-12. Поворот дамы под левой рукой кавалера против линии танца, у кавалера два приставных шага против линии танца, в конце встать в закрытую пару.
* 13-16. Два тура вальса.
",

            Videos = videos,
            Music = music
        };
        */
    }
}
