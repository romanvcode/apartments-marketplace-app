using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApartmentMarketplace.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Apartments",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Rooms = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(99)", maxLength: 99, nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(999)", maxLength: 999, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apartments", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Apartments");
        }
    }
}
