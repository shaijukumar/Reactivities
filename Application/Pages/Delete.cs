using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Pages
{
    public class Delete
    {
        public class Command : IRequest
        { 
            public Guid Id { get; set; }
        }
    
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 var page  = await _context.Pages                    
                    .FindAsync(request.Id);
                
                if (page == null)
                    throw new Exception("Could not find page");

                _context.Remove(page);  

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem on delete");
            }

        }
            
    }
}