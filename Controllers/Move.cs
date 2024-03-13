using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoveController : ControllerBase
{
    private readonly ILogger<MoveController> _logger;
    public MoveController(ILogger<MoveController> logger) {
        _logger = logger;
    }

    [HttpGet]
    public Move Get(int id) {

        var Videos = new Collection<Media>();
        Videos.Append( new Media{ Url = "11" , Name = "22"});

        return new Move
        {
            Id = id,
            Name = "Соло-поворот",
            Description = @"Кавалер и дама делают поворот на 360 градусов через левое плечо с продвижением по линии танца.",
            Videos = Videos
        };
    }
}
