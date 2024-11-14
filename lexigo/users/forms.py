# forms.py
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm
from .models import Profile
from django.contrib.auth.forms import UserCreationForm

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ["profile_picture"]

class CustomUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']

class CustomPasswordChangeForm(PasswordChangeForm):
    new_password1 = forms.CharField(widget=forms.PasswordInput(), label="New Password")
    new_password2 = forms.CharField(widget=forms.PasswordInput(), label="Confirm New Password")

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Email")
    profile_picture = forms.ImageField(required=False, label="Profile Picture", allow_empty_file=True)
    # profile = Profile.objects.create(user=user)
    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        
        print("user save initaited")
        if commit:
            user.save()
        print("user save success")
        # Create a profile for the user if it doesn't exist (we only want to create one profile)
        profile, created = Profile.objects.get_or_create(user=user)
        
        if not created:
            # If profile already exists, update profile fields if necessary
            profile.profile_picture = self.cleaned_data.get("profile_picture")
            profile.save()
            
        return user

