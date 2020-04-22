using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Application.Pages
{
    public class List
    {
        public class Query : IRequest<List<Domain.Page>> { }

    
        public class Handler : IRequestHandler<Query, List<Domain.Page>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Page>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pages = await _context.Pages
                    .ToListAsync();
                return pages;

            }
        }
            
    }
}

