using Microsoft.EntityFrameworkCore.Migrations;

namespace book_management_api.Migrations
{
    public partial class Changethumnailtothumbnailanddecimaltointpriceforbook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ThumnailUrl",
                table: "Books",
                newName: "ThumbnailUrl");

            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "Books",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ThumbnailUrl",
                table: "Books",
                newName: "ThumnailUrl");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Books",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
