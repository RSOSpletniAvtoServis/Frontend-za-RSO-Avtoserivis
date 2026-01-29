public class DN02{
	static void pravokotnik(int a,int b){
		int i,j;
		System.out.printf("a = %d, b = %d   ",a,b);
		for(i = 0;i < b;i++){
			System.out.printf("X");
		}
		System.out.println();
		for(i = 0;i < a - 1;i++){
			for(j = 0;j < 15;j++){
				System.out.printf(" ");
			}
			for(j = 0;j < b;j++){
				System.out.printf("X");
			}
			System.out.println();
		}
	}
	public static void main(String args[]){
		if(args.length >= 2){
		pravokotnik(Integer.parseInt(args[0]),Integer.parseInt(args[1]));
		}
		else{
			int i,j;
			for(i = 1; i < 6;i++){
				for(j = 1;j < 6;j++){
					pravokotnik(i,j);
					System.out.println();
				}
			}
		}
	}
}