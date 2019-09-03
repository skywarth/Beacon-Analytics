using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class HourlyVisitorMuseumDTO : BaseReadDTO
    {

        private TimeSpan hour;
        private int count;

        public TimeSpan Hour { get => hour; set => hour = value; }
        public int Count { get => count; set => count = value; }
    }
}
