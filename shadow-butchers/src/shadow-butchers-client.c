#include <stdio.h>
#include <unistd.h>
#include <dlfcn.h>

#define PREMIUM "./ShadowButchersPremium.so"

void print_options(){
    puts("=----------Options----------=");
    puts("[1] List affiliated suppliers");
    puts("[2] Order meat from supplier");
    puts("[3] Check meat in stock");
    puts("[4] Sell meat (premium client only)");
    puts("[5] Close client");
    puts("=---------------------------=");
}   

void list_suppliers() {
    puts("=------------Suppliers-----------=");
    puts("Supplier on ShadowButchers market:");
    puts("UndergroundCuts");
    puts("CovertCarnivore");
    puts("Sub Rosa Meats");
    puts("CloakedCuts Co.");
    puts("WhisperingWagyu Wholesalers");
    puts("=--------------------------------=");
}

void order_meat() {
    char supplier[27];
    int option = 0;

    // int c;
    // while ( (c = getchar()) != '\n' && c != EOF ) { } // Clear the input buffer for unwanted newlines
    puts("=-------------------------Order----------------------------=");
    printf("Input the name of the supplier you want to order from: ");
    gets(supplier);
    printf("You are ordering from %s.\n", supplier);
    puts("[1] Elephant meat: 100$ per pound");
    puts("[2] Panda meat: 600$ per pound");
    puts("[3] Wale meat: 800$ per pound");
    printf("What do you want to order: ");
    scanf("%d", &option);
    puts("");
    printf("The order has been placed. \nThe supplier will check it's client (if they have not been arrested) and will hopefully send you what you ordered.");
    puts("=-----------------------------------------------------------=");
    sleep(1);
}

void stock_meat() {
    puts("=-----------Stock---------=");
    puts("You have no meat in stock!");
    puts("=-------------------------=");
}

int main(int argc, char* argv[]) {
    printf("\n");
    puts("█████╗██╗░░██╗█████╗  ██████╗░ ██████╗ ██╗     ██╗    ██████╗ ██╗   ██╗████████╗ ██████╗██╗░░██╗██████╗██████╗ █████╗");
    puts("██╔══╝██║░░██║██╔══██╗██╔══██╗██╔═══██╗██║ ██╗ ██║    ██╔══██╗██║░  ██║░░ ██╔══╝██╔════╝██║░░██║██╔═══╝██╔══██╗██╔══╝");
    puts("████╗░███████║███████║██║░░██║██║░░░██║██║████╗██║ ██ ██████╔╝██║░░ ██║░░ ██║░░ ██║░    ███████║██████╗██████╔╝████╗░");
    puts("╚═███╗██╔══██║██╔══██║██║░░██║██║░░░██║████╔═████║ ██ ██╔══██╗██║░░ ██║░░ ██║░  ██║░░   ██╔══██║██╔═══╝██╔══██╗╚═███╗");
    puts("█████║██║░░██║██║░░██║██████╔╝╚██████╔╝███╔╝░░███║    ██████╔╝╚██████╔╝░░ ██║░  ╚██████╗██║░░██║██████╗██║░░██║█████║");
    puts("╚════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝░ ╚═════╝ ╚══╝   ╚══╝    ╚═════╝  ╚═════╝    ╚═╝    ╚═════╝╚═╝  ╚═╝╚═════╝╚═╝  ╚═╝╚════╝");
    printf("\n");
    printf("\t\tWelcome to ShadowButchers: Your Secret Hub for Rare Cuts and Exotic Fare!\n    Discover a World of Flavor Beyond the Ordinary. Sink Your Teeth into Forbidden Delights from the Underworld.");
    printf("\n\n");

    uid_t euid = geteuid();
    printf("Effective User ID: %d\n", euid);

    char option;
    int exit = 0;
    void *handle;
    void (*sell_meat) ();
    
    while (1) {
        if (exit == 1) {
            puts("[*] Closing black market client...");
            sleep(1);
            break;
        }
        printf("\n");
        print_options(handle);
        printf("What do you want to do? ");
        scanf("%c", &option);
        fseek(stdin,0,SEEK_END);

        int c;
        while ( (c = getchar()) != '\n' && c != EOF ) { } // Clear the input buffer for unwanted newlines

        switch (option) {
            case '1':
                list_suppliers();
                break;
            case '2':
                order_meat();
                break;
            case '3':
                stock_meat();
                break;
            case '4':
                handle = dlopen(PREMIUM, RTLD_LAZY);
                if (handle){
                    sell_meat = dlsym(handle, "sell");
                    if (!sell_meat) {dlclose(handle); printf("It seems there is something wrong the license you purchased.\n Are you sure you have not been scammed?\n");};
                    sell_meat();
                    dlclose(handle);
                } else {
                    printf("You don't have the premium edition of the client.\nYou can buy it in the portal for 1337 bitcoin.\n");
                }
                break;
            case '5':
                exit = 1;
                break;
            default:
                puts("Option not available!");
                break;
        }
    }

}
