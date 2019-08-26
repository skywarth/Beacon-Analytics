using Beamity.Application.DTOs;
using Beamity.Application.DTOs.BeaconActivityDTOs;
using Beamity.Application.Service.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Beamity.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BeaconActivityController : ControllerBase
    {
        private readonly IBeaconActivityService _beaconActivityService;
        public BeaconActivityController(IBeaconActivityService beaconActivityService)
        {
            _beaconActivityService = beaconActivityService;
        }



        [HttpGet("{id}")]
        public async Task<ReadBeaconActivityDTO> GetBeaconActivity(EntityDTO input)
        {
            try
            {
                var beaconActivity = await _beaconActivityService.GetBeaconActivity(input);
                return beaconActivity;
            }
            catch (System.Exception)
            {

                throw;
            }

        }


        [HttpPost]
        [AllowAnonymous]/*LocationId*/
        public async Task<List<ReadBeaconActivityDTO>> GetAllBeaconActivity(EntityDTO input)
        {
            try
            {

                var beaconActivities = await _beaconActivityService.GetAllBeaconActivities(input);
                return beaconActivities;
            }
            catch (System.Exception e)
            {

                throw e;
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateBeaconActivity(CreateBeaconActivityDTO input)
        {
            try
            {
                await _beaconActivityService.CreateBeaconActivity(input);
                return Ok();
            }
            catch (System.Exception e)
            {

                throw e;
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBeaconActivity(DeleteBeaconActivityDTO input)
        {
            try
            {
                await _beaconActivityService.DeleteBeaconActivity(input);
                return Ok();
            }
            catch (System.Exception)
            {

                throw;
            }
        }





    }
}
