using System;
using System.Threading;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Persistence;
using Domain;
using System.Threading.Tasks;

namespace Application.categorys
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            // public string Title { get; set; }
            // public string Description { get; set; }
            // public string CategoryId { get; set; }
            // public string URLTitle { get; set; }
            // public string categoryHtml { get; set; }

        }

         public class CommandValidator : AbstractValidator<Command>{
           public CommandValidator()
            {
                // RuleFor(x => x.Title).NotEmpty();
                // RuleFor(x => x.CategoryId).NotEmpty();
                // RuleFor(x => x.URLTitle).NotEmpty();
                // RuleFor(x => x.categoryHtml).NotEmpty();
            }
        }
    
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var Category = new category
                {
                    Id = request.Id,
                    // Title = request.Title,
                    // Description = request.Description,
                    // CategoryId = request.CategoryId,
                    // URLTitle = request.URLTitle,
                    // categoryHtml = request.categoryHtml
                };

                _context.categorys.Add(Category);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
            
    }
}
