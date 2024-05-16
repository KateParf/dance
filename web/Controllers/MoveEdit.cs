using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoveEditController : ControllerBase
{
    private readonly DanceContext _context;
    private readonly ILogger<MoveEditController> _logger;


    public MoveEditController(DanceContext context, ILogger<MoveEditController> logger)
    {
        _logger = logger;
        _context = context;
    }

    [HttpPost]
    public async Task<string> Post([FromBody] MoveEdit moveEdit)
    {

        /*
        var dance = _context.Dances.Where(d => d.Id == intId)
        .Include(d => d.Videos)
        .FirstOrDefault<Dance>();
        */

        if (moveEdit.id == 0)
        {
            // new
            var newMove = new Move();

            ///newMove.Id = moveEdit.id;
            newMove.Name = moveEdit.name;
            newMove.Description = moveEdit.description;

            _context.Add(newMove);
            await _context.SaveChangesAsync();
        }
        else
        {
            // update
            var newMove = _context.Moves.Where(d => d.Id == moveEdit.id)
                .Include(d => d.Videos)
                .FirstOrDefault<Move>();
           
        
            newMove.Name = moveEdit.name;
            newMove.Description = moveEdit.description;

            // parse dance string name;url\nName2;Url2
            var videos = new Collection<Video>();
            var strVideoParts = moveEdit.videos.Split("\n");
            foreach (var strVideoPart in strVideoParts) {
                if (strVideoPart == "") continue;
                var subParts = strVideoPart.Split(";");
                var video = new Video() { Name = subParts[0], Url = subParts[1] };
                videos.Add(video);
            }
            newMove.Videos = videos;

            _context.Update(newMove);
            await _context.SaveChangesAsync();
        }

        return moveEdit.name;
    }
}
