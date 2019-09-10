using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class DateAndAverageDTO
    {
        private string date;
        private double average;

        public string Date { get => date; set => date = value; }
        public double Average { get => average; set => average = value; }
    }
}
