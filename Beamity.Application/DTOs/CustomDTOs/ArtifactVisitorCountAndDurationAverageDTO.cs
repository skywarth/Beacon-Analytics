using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class ArtifactVisitorCountAndDurationAverageDTO
    {
        //private Guid id;
        private string date;
        private int count;
        private double averageTime;

        //public Guid Id { get => id; set => id = value; }
        public string Date { get => date; set => date = value; }
        public int Count { get => count; set => count = value; }
        public double AverageTime { get => averageTime; set => averageTime = value; }
    }
}
