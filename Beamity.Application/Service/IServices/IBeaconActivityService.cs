using Beamity.Application.DTOs;
using Beamity.Application.DTOs.BeaconActivityDTOs;
using Beamity.Application.DTOs.CustomDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Beamity.Application.Service.IServices
{
    public interface IBeaconActivityService
    {
        Task<List<ReadBeaconActivityDTO>> GetAllBeaconActivities(EntityDTO input);
        Task CreateBeaconActivity(CreateBeaconActivityDTO input);
        //Task UpdateBeaconActivity(UpdateArtifactDTO input);
        Task DeleteBeaconActivity(DeleteBeaconActivityDTO input);
        Task<ReadBeaconActivityDTO> GetBeaconActivity(EntityDTO input);
        //Task<List<ReadArtifactDTO>> GetArtifactsInRoom(EntityDTO input);

        Task<double> GetArtifactsVisitorAverage(EntityDTO input);

        Task<double> GetRoomsVisitorAverage(EntityDTO input);

        Task<double> GetArtifactsWatchTimeAverage(EntityDTO input);
        Task<double> GetRoomsWatchTimeAverage(EntityDTO input);

        Task<double> GetLocationBounceRate(EntityDTO input);

        Task<int> GetCurrentVisitors(EntityDTO input);

        Task<double> GetUserWatchTimeAverage(EntityDTO input);
        Task<double> GetUserArtifactAverage(EntityDTO input);

        Task<List<MaxMinVisitorArtifactDTO>> GetMaxVisitorArtifact(EntityDTO input);

        Task<List<HourlyVisitorMuseumDTO>> GetHourlyVisitorsMuseum(EntityDTO input);

        Task<List<RoomsArtifactHourly>> GetHourlyVisitorsArtifact(EntityDTO input);

        //Task<List<RoomsArtifactHourly>> GetHourlyVisitorsArtifact(EntityDTO input);

        Task<List<BehaviourFlowListDTO>> GetBehaviourFlow(BehaviourFlowRangeDTO input);

        Task<string> GetVisitorChange(EntityDTO input);

        Task<string> GetDurationChange(EntityDTO input);


        //artifact
        Task<List<ArtifactVisitorCountAndDurationAverageDTO>> GetArtifactVisitorCountAndDurationAverage(EntityDTO input);

        Task<List<DateAndAverageDTO>> GetArtifactCountPerUser(EntityDTO input);

        Task<List<ArtifactVisitorCountAndDurationAverageDTO>> GetArtifactsVisitorCountAndDurationAverage(EntityDTO input);

        Task<List<BounceRatesDTO>> GetAllBounceRates(EntityDTO input);

        //ROOM
        Task<List<RoomVisitorCountAndDurationAverageDTO>> GetRoomVisitorCountAndDurationAverage(EntityDTO input);

        Task<List<DateAndAverageDTO>> GetRoomCountPerUser(EntityDTO input);

        Task<List<RoomVisitorCountAndDurationAverageDTO>> GetRoomsVisitorCountAndDurationAverage(EntityDTO input);

    }
}
