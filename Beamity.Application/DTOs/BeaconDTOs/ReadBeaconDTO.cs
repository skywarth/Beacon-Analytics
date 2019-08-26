using Beamity.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.BeaconDTOs
{
    public class ReadBeaconDTO : BaseReadDTO
    {
        public string Name { get; set; }
        public string UUID { get; set; }
        public int Major { get; set; }
        public int Minor { get; set; }
        public Artifact Artifact { get; set; }

        //public Location Location { get; set; }
    }
}
