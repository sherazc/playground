package eg03_java_kotlin_interportable;

public class Jki01_MyApp {
    public static void main(String[] args) {

        // Root kotlin functions become static methods
        System.out.println(MyKotlinFile.add());
        System.out.println(MyKotlinFile.add(1));
        System.out.println(MyKotlinFile.add(1,2));

        MyKotlinClass myKotlinClass = new MyKotlinClass();
        System.out.println(myKotlinClass.add());
        System.out.println(myKotlinClass.add(1));
        System.out.println(myKotlinClass.add(1, 2));
    }
}
