fun main(args: Array<String>) {

    val fName: String = "Sheraz"
    var lName = "Chaudhry"

    val multiLineString = """Hi,
I am $fName $lName

fName.equals(lName) = ${fName.equals(lName)}
fName.compareTo(lName) = ${fName.compareTo(lName)}

fName.length = ${fName.length}

fName char at 2 = ${fName.get(2)}
fName char at 2 = ${fName[2]}

fNmae substring from 2 to 5 = ${fName.subSequence(2, 5)}
"""

    println(multiLineString)


}
