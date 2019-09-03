using Beamity.Application.DTOs.BeaconActivityDTOs;
using Beamity.Application.DTOs.RoomDTOs;
using Beamity.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class BehaviourFlowDTO
    {
        private ReadBeaconActivityDTO from;
        private ReadBeaconActivityDTO to;

        public BehaviourFlowDTO(ReadBeaconActivityDTO from, ReadBeaconActivityDTO to)
        {
            From = from;
            To = to;
        }

        protected BehaviourFlowDTO()
        {

        }
        public ReadBeaconActivityDTO From { get => from; set => from = value; }
        public ReadBeaconActivityDTO To { get => to; set => to = value; }
    }
}
