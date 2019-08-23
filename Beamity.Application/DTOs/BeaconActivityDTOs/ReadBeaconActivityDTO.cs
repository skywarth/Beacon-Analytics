using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.BeaconActivityDTOs
{
    public class ReadBeaconActivityDTO : BaseReadDTO
    {
        public Guid BeaconId { get; set; }
        public Guid UserId { get; set; }

        public DateTime EnterTime { get; set; }
        public DateTime ExitTime { get; set; }
        public string BuildingName { get; set; }
    }
}
