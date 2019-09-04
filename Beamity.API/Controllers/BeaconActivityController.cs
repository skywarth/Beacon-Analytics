using Beamity.Application.DTOs;
using Beamity.Application.DTOs.BeaconActivityDTOs;
using Beamity.Application.DTOs.CustomDTOs;
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
                data.RoomsWatchTimeAverage1 = await _beaconActivityService.GetRoomsWatchTimeAverage(input);
                data.RoomsWatchTimeAverage1 = await _beaconActivityService.GetRoomsWatchTimeAverage(input);
                data.LocationBounceRate1 = await _beaconActivityService.GetLocationBounceRate(input);
                data.LocationCurrentVisitors1 = await _beaconActivityService.GetCurrentVisitors(input);
                data.UserWatchTimeAverage1 = await _beaconActivityService.GetUserWatchTimeAverage(input);
                data.UserArtifactAverage1 = await _beaconActivityService.GetUserArtifactAverage(input);
                data.MaxMinVisitorArtifact1 = await _beaconActivityService.GetMaxVisitorArtifact(input);
                data.HourlyVisitorsMuseum1=await _beaconActivityService.GetHourlyVisitorsMuseum(input);
                data.RoomsArtifactHourly=await _beaconActivityService.GetHourlyVisitorsArtifact(input);
                data.BehaviourFlow= await _beaconActivityService.GetBehaviourFlow(input);

                data.VisitorChange = await _beaconActivityService.GetVisitorChange(input);
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
            private double RoomsWatchTimeAverage;
            private double LocationBounceRate;
            private int LocationCurrentVisitors;
            private double UserWatchTimeAverage;
            private double UserArtifactAverage;
            private List<MaxMinVisitorArtifactDTO> MaxMinVisitorArtifact;
            private List<HourlyVisitorMuseumDTO> HourlyVisitorsMuseum;
            private List<RoomsArtifactHourly> roomsArtifactHourly;
            private List<BehaviourFlowListDTO> behaviourFlow;

            /*CARDS*/
            private string visitorChange;

            public double ArtifactsVisitorAverage1 { get => ArtifactsVisitorAverage; set => ArtifactsVisitorAverage = value; }
            public double RoomsVisitorAverage1 { get => RoomsVisitorAverage; set => RoomsVisitorAverage = value; }
            public double ArtifactsWatchTimeAverage1 { get => ArtifactsWatchTimeAverage; set => ArtifactsWatchTimeAverage = value; }
            public double RoomsWatchTimeAverage1 { get => RoomsWatchTimeAverage; set => RoomsWatchTimeAverage = value; }
            public double LocationBounceRate1 { get => LocationBounceRate; set => LocationBounceRate = value; }
            public int LocationCurrentVisitors1 { get => LocationCurrentVisitors; set => LocationCurrentVisitors = value; }
            public double UserWatchTimeAverage1 { get => UserWatchTimeAverage; set => UserWatchTimeAverage = value; }
            public double UserArtifactAverage1 { get => UserArtifactAverage; set => UserArtifactAverage = value; }
            public List<MaxMinVisitorArtifactDTO> MaxMinVisitorArtifact1 { get => MaxMinVisitorArtifact; set => MaxMinVisitorArtifact = value; }
            public List<HourlyVisitorMuseumDTO> HourlyVisitorsMuseum1 { get => HourlyVisitorsMuseum; set => HourlyVisitorsMuseum = value; }
            public List<RoomsArtifactHourly> RoomsArtifactHourly { get => roomsArtifactHourly; set => roomsArtifactHourly = value; }
            public List<BehaviourFlowListDTO> BehaviourFlow { get => behaviourFlow; set => behaviourFlow = value; }
            public string VisitorChange { get => visitorChange; set => visitorChange = value; }
        }

    }
}
