using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class BounceRatesDTO
    {
        private string date;
        private double value;

        public string Date { get => date; set => date = value; }
        public double Value { get => value; set => this.value = value; }
    }
}
