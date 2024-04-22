ShadowButchersClient: ShadowButchersPremium.so
	gcc -m32 shadow-butchers-client.c -o shadow-butchers-client -fno-stack-protector -z execstack -ldl

ShadowButchersPremium.so :
	gcc --shared -m32 -fPIC -o shadow-butchers-premium.so shadow-butchers-premium.c
