using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tanez.Models;

namespace tanez.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanceEditController : ControllerBase
{
    private readonly DanceContext _context;
    private readonly ILogger<DanceEditController> _logger;


    public DanceEditController(DanceContext context, ILogger<DanceEditController> logger)
    {
        _logger = logger;
        _context = context;
    }

    [HttpPost]
    public async Task<string> Post([FromBody] DanceEdit danceEdit)
    {

        /*
        var dance = _context.Dances.Where(d => d.Id == intId)
        .Include(d => d.Videos)
        .FirstOrDefault<Dance>();
        */

        if (danceEdit.id == 0)
        {
            // new
            var newDance = new Dance();

            var newDanceType = await _context.DanceType.FirstOrDefaultAsync(
                 c => c.Id == danceEdit.type);
            var newDanceEpoch = await _context.DanceEpochs.FirstOrDefaultAsync(
                 c => c.Id == danceEdit.epoch);
            var newDanceLevel = await _context.DanceLevel.FirstOrDefaultAsync(
                 c => c.Id == danceEdit.level);

            ///newDance.Id = danceEdit.id;
            newDance.Name = danceEdit.name;
            newDance.History = danceEdit.history;
            newDance.Scheme = danceEdit.scheme;
            newDance.Type = newDanceType;
            newDance.Epoch = newDanceEpoch;
            newDance.Level = newDanceLevel;
            newDance.ChangePartner = danceEdit.changePartner;
            newDance.CountOfPairs = danceEdit.countOfPairs;

            _context.Add(newDance);
            await _context.SaveChangesAsync();
        }
        else
        {
            // update
            var newDance = _context.Dances.Where(d => d.Id == danceEdit.id)
                .Include(d => d.Videos)
                .Include(d => d.Music)
                .FirstOrDefault<Dance>();

            var newDanceType = await _context.DanceType.FirstOrDefaultAsync(
                 c => c.Id == danceEdit.type);
            var newDanceEpoch = await _context.DanceEpochs.FirstOrDefaultAsync(
                 c => c.Id == danceEdit.epoch);
            var newDanceLevel = await _context.DanceLevel.FirstOrDefaultAsync(
                 c => c.Id == danceEdit.level);                
        
            newDance.Name = danceEdit.name;
            newDance.History = danceEdit.history;
            newDance.Scheme = danceEdit.scheme;
            newDance.Type = newDanceType;
            newDance.Epoch = newDanceEpoch;
            newDance.Level = newDanceLevel;
            newDance.ChangePartner = danceEdit.changePartner;
            newDance.CountOfPairs = danceEdit.countOfPairs;

            // parse dance string name;url\nName2;Url2
            var videos = new Collection<Video>();
            var strVideoParts = danceEdit.videos.Split("\n");
            foreach (var strVideoPart in strVideoParts) {
                if (strVideoPart == "") continue;
                var subParts = strVideoPart.Split(";");
                var video = new Video() { Name = subParts[0], Url = subParts[1] };
                videos.Add(video);
            }
            newDance.Videos = videos;

            _context.Update(newDance);
            await _context.SaveChangesAsync();
        }

        return danceEdit.name;
    }
}
