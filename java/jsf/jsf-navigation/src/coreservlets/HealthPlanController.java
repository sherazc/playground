package coreservlets;

public class HealthPlanController {
  public String signup() {
    if (Math.random() < 0.2) {
      return("accepted");
    } else {
      return("rejected");
    }
  }
}
