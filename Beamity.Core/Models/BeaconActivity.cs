using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Beamity.Core.Models
{
    public class BeaconActivity : EntityBase
    {
        public Guid BeaconId { get; set; }
        [ForeignKey("BeaconId")]
        public Beacon Beacon { get; set; }

        public Guid UserId { get; set; }

        public DateTime EnterTime { get; set; }

        public DateTime ExitTime { get; set; }
    }
}
