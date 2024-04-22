ShadowButchersClient: ShadowButchersPremium.so
	gcc -m32 ShadowButchersClient.c -o ShadowButchersClient -fno-stack-protector -z execstack	

ShadowButchersPremium.so :
	gcc --shared -m32 -fPIC -o ShadowButchersPremium.so ShadowButchersPremium.c
