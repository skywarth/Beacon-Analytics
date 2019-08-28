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

        [HttpPost]
        public async Task<double> GetArtifactsVisitorAverage(EntityDTO input)
        {
            try
            {
                var beaconActivity = await _beaconActivityService.GetArtifactsVisitorAverage(input);
                return beaconActivity;
            }
            catch (System.Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public async Task<double> GetRoomsVisitorAverage(EntityDTO input)
        {
            try
            {
                var beaconActivity = await _beaconActivityService.GetRoomsVisitorAverage(input);
                return beaconActivity;
            }
            catch (System.Exception)
            {

                throw;
            }

        }
        [HttpPost]
        public async Task<DashboardPayload> GetDashboardPayload(EntityDTO input)
        {
            try
            {
                DashboardPayload data = new DashboardPayload();
                data.ArtifactsVisitorAverage1 = await _beaconActivityService.GetArtifactsVisitorAverage(input);
                data.RoomsVisitorAverage1 = await _beaconActivityService.GetRoomsVisitorAverage(input);
                data.ArtifactsWatchTimeAverage1 = await _beaconActivityService.GetArtifactsWatchTimeAverage(input);
                return data;
            }
            catch (System.Exception)
            {

                throw;
            }

        }


        public class DashboardPayload{
            private double ArtifactsVisitorAverage;
            private double RoomsVisitorAverage;
            private double ArtifactsWatchTimeAverage;

            public double ArtifactsVisitorAverage1 { get => ArtifactsVisitorAverage; set => ArtifactsVisitorAverage = value; }
            public double RoomsVisitorAverage1 { get => RoomsVisitorAverage; set => RoomsVisitorAverage = value; }
            public double ArtifactsWatchTimeAverage1 { get => ArtifactsWatchTimeAverage; set => ArtifactsWatchTimeAverage = value; }
        }

    }
}
