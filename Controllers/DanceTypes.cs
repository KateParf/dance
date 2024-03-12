using Microsoft.AspNetCore.Mvc;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceTypesController : ControllerBase
{
    private readonly ILogger<DanceTypesController> _logger;
    public DanceTypesController(ILogger<DanceTypesController> logger) {
        _logger = logger;
    }

    private static readonly string[] Names = new[]
    {
          "Аллеманды", "Бранли", "Вальсы", "Галопы", "Кадрили", "Контрдансы", "Котильоны", "Лендлеры", 
          "Мазурки", "Марши", "Менуэты", "Народные танцы", "Паваны", "Полонезы", "Польки", 
          "Современные танцы", "Танго", "Тустепы и фокстрот"
    };

    [HttpGet]
    public IEnumerable<DanceType> Get()
    {
        return Enumerable.Range(0, Names.Length).Select(index => new DanceType
        {
            Id = index,
            Name = Names[index]
        })
        .ToArray();
    }
}
