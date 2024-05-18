using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez.Models;
using tanez;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IndexInfoController : ControllerBase {
    private readonly DanceContext _context;

    private readonly ILogger<IndexInfoController> _logger;

    public IndexInfoController(DanceContext context, ILogger<IndexInfoController> logger) {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public IndexInfo Get()
    {
        var newIndexInfo = new IndexInfo();
        var cntDances = _context.Dances.Count();
        var lastDance = _context.Dances.OrderByDescending(d => d.Id).FirstOrDefault<Dance>();

        var cntMoves = _context.Moves.Count();
        var lastMove = _context.Moves.OrderByDescending(d => d.Id).FirstOrDefault<Move>();

        newIndexInfo.CntDances = cntDances;
        newIndexInfo.CntMoves = cntMoves;
        newIndexInfo.LastDanceId = lastDance.Id;
        newIndexInfo.LastDanceName = lastDance.Name;
        newIndexInfo.LastMoveName = lastMove.Name;

        return newIndexInfo;
    }
}
