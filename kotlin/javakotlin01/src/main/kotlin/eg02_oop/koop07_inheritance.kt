package eg02_oop

interface Action {
    fun performAction()
}

interface Play: Action {
    fun play()
}

// All classes and methods are final unless they are marked "open"
open class Parent(open val name: String) : Action {

    open fun sayHello() {
        println("Parent says, my name is $name")
    }

    override fun performAction() {
        println("Parent guides a child")
    }
}

// All override fields and method have to be mark "override"
class Child(override val name: String, val age: Int): Play, Parent(name) {
    override fun play() {
        println("$age year old $name is playing.")
    }

    override fun sayHello() {
        println("Child says, my name is $name, and I am $age year old.")
    }

    override fun performAction() {
        println("Child listens and obey.")
    }
}

fun main() {
    val p = Parent("Sheraz")
    val c = Child("Muhammad", 4)

    p.sayHello()
    p.performAction()

    c.sayHello()
    c.performAction()
    c.play()
}
