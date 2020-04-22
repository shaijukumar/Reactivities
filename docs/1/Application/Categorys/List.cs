using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Application.Categorys
{
    public class List
    {
        public class Query : IRequest<List<Domain.Category>> { }

    
        public class Handler : IRequestHandler<Query, List<Domain.Category>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categorys = await _context.Categorys
                    .ToListAsync();
                return categorys;

            }
        }
            
    }
}


