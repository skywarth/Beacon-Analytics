﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs
{
    public class EntityDTO
    {
        public Guid Id { get; set; }

        public EntityDTO(Guid id)
        {
            this.Id = id;
        }
        public EntityDTO()
        {

        }
    }


    
}
