using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class BehaviourFlowRangeDTO
    {
        

        public BehaviourFlowRangeDTO(Guid id)
        {
            this.Id = id;
        }

        public DateTime Start { get; set; } = DateTime.Now.Date;
        public DateTime End { get; set; } = DateTime.Now.Date;
        public Guid Id { get; set; }
    }
}
