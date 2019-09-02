using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class HourlyArtifactDTO
    {
        private TimeSpan hour;
        private int count;
        private Guid ArtifactId;


        public TimeSpan Hour { get => hour; set => hour = value; }
        public int Count { get => count; set => count = value; }
        public Guid ArtifactId1 { get => ArtifactId; set => ArtifactId = value; }
    }
}
