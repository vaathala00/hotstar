import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';


class SignUpScreen extends StatefulWidget {
  @override
  _SignUpScreenState createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen>
    with TickerProviderStateMixin {
  TextEditingController _fullNameController = TextEditingController();
  TextEditingController _usernameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  TextEditingController _confirmPasswordController = TextEditingController();
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 1500),
    );
    _animationController.forward();
  }

  // Function to validate the password and confirm password
  bool _isEmpty(String full_name, String username, String email) {
    if (full_name.isEmpty) {
      _showErrorMessage('Name cannot be empty');
      return true;
    }
    if (username.isEmpty) {
      _showErrorMessage('Username cannot be empty');
      return true;
    }
    if (email.isEmpty) {
      _showErrorMessage('Email cannot be empty');
      return true;
    }
    return false;
  }

  bool _isPasswordValid(String password, String confirmPassword) {
    // Password should have at least 8 characters
    if (password.length < 8) {
      _showErrorMessage('Password must have at least 8 characters.');
      return true;
    }

    // Password should contain at least one letter
    if (!password.contains(RegExp(r'[a-zA-Z]'))) {
      _showErrorMessage('Password must contain at least one letter.');
      return true;
    }

    // Password should contain at least one symbol
    if (!password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
      _showErrorMessage('Password must contain at least one symbol.');
      return true;
    }

    // Password and Confirm Password should match
    if (password != confirmPassword) {
      _showErrorMessage('Password and Confirm Password do not match.');
      return true;
    }

    return false;
  }

  // Function to show an error message dialog
  void _showErrorMessage(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Message'),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () {
                if (message == "Registered!") {
                  Navigator.pushNamed(context, '/login');
                } else {
                  Navigator.of(context).pop();
                }
              },
                child: Text(message == "Registered!" ? 'Login' : 'Close'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.blue, Colors.black38, Colors.blueGrey],
              ),
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(height: 20),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: TextField(
                    controller: _fullNameController,
                    decoration: InputDecoration(
                      labelText: 'Full Name',
                      alignLabelWithHint: true,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: TextField(
                    controller: _usernameController,
                    decoration: InputDecoration(
                      labelText: 'Username',
                      alignLabelWithHint: true,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: TextField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: 'Email',
                      alignLabelWithHint: true,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: TextField(
                    controller: _passwordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      alignLabelWithHint: true,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: TextField(
                    controller: _confirmPasswordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Confirm Password',
                      alignLabelWithHint: true,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                TextButton(
                  onPressed: () async {
                    // Validate the password and confirm password before proceeding

                    if (_isEmpty(_fullNameController.text,
                        _usernameController.text, _emailController.text)) {
                    } else if (_isPasswordValid(_passwordController.text,
                        _confirmPasswordController.text)) {
                    } else {
                      _showErrorMessage('Registered!');
                      try {
                        final credential = await FirebaseAuth.instance
                            .createUserWithEmailAndPassword(
                          email: _emailController.text,
                          password: _passwordController.text,
                        );
                      } on FirebaseAuthException catch (e) {
                        if (e.code == 'weak-password') {
                          print('The password provided is too weak.');
                        } else if (e.code == 'email-already-in-use') {
                          print('The account already exists for that email.');
                        }
                      } catch (e) {
                        print(e);
                      }
                      await FirebaseAuth.instance.signOut();
                    }
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: Color.fromARGB(66, 13, 13, 13),
                    primary: Colors.white,
                    padding: EdgeInsets.all(15),
                  ),
                  child: Text('Register'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }
}
