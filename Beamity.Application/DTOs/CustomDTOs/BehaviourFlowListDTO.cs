using System;
using System.Collections.Generic;
using System.Text;
using Beamity.Application.DTOs.BeaconActivityDTOs;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class BehaviourFlowListDTO : BehaviourFlowDTO
    {
        private int count;
        /*private ReadBeaconActivityDTO from;
        private ReadBeaconActivityDTO to;*/
        private string from;
        private string to;

        

        public int Count { get => count; set => count = value; }
        public string From { get => from; set => from = value; }
        public string To { get => to; set => to = value; }
    }
}
